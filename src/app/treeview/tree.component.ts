
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-tree",
    templateUrl: "./tree.component.html",
    styleUrls: ["./tree.component.css"],
})
export class TreeComponent {
    @Input() data: any;
    @Input() eleID: string = "";
    parentId: any = 0;
    currentData: any;
    children = [];
    rootId: string = "";
    constructor() { }
    ngOnInit() {
        this.rootId = this.makeid(10);
    }
    openChild = ($event: any, item: any) => {
        if (item.children && item.children.length > 0) item.isopen = !item.isopen;
        $event.stopPropagation();
    };
    click($event: any, item: any) {
        console.log("Selected Item-->", item);
        $event.stopPropagation();
    }
    allowDrop(ev: any) {
        document.querySelectorAll("li.re-order").forEach(function (e: any) {
            e["style"].border = "none";
            e["style"].height = "0px";
        });
        if (ev.target.classList.contains("re-order")) {
            ev.target.style.borderBottom = "2px solid blue";
            ev.target.style.height = "0px";
        }
        document.querySelectorAll("li.list-item").forEach(function (e: any) {
            e.children[0]["style"].border = "1px solid transparent";
        });
        if (
            ev.target.closest("li.list-item") &&
            !ev.target.classList.contains("re-order")
        ) {
            ev.target.closest("li.list-item").children[0].style.border =
                "1px solid green";
        }

        ev.preventDefault();
    }

    drag(ev: any, item: any) {
        ev.dataTransfer.setData("text", JSON.stringify(item));
    }

    drop(ev: any, id: any) {
        document.querySelectorAll("li.list-item div").forEach(function (e: any) {
            e["style"].border = "1px solid transparent";
        });
        document.querySelectorAll("li.re-order").forEach(function (e: any) {
            e["style"].border = "none";
            e["style"].height = "0px";
        });

        if (ev.target.classList.contains("re-order")) {
            //Re-ordering
            let parentNodeId = ev.target.closest("ul").dataset.nodeId;
            let nodeIndex = ev.target.dataset.order;
            this.data = this.removeNodeById(
                this.data,
                JSON.parse(ev.dataTransfer.getData("text")).id
            );
            if (parentNodeId == 0) {
                this.data.splice(
                    nodeIndex,
                    0,
                    JSON.parse(ev.dataTransfer.getData("text"))
                );
            } else {
                this.findAndReorder(
                    this.data,
                    parentNodeId,
                    JSON.parse(ev.dataTransfer.getData("text")),
                    nodeIndex
                );
            }
            console.log(parentNodeId, nodeIndex);
            console.log("reordering");
        } else {
            let parentId = ev.target.closest("li").dataset["parent"];
            let data = ev.dataTransfer.getData("text");
            let currentID = JSON.parse(data).id;
            if (parentId != currentID) {
                this.data = this.removeNodeById(this.data, currentID);
                this.data = this.findAndAdd(this.data, parentId, JSON.parse(data));
            }
        }
        console.log("updated dataset", this.data);
        ev.stopPropagation();
    }

    /**
     * Find and reorder element as a child for parent id
     * @param nodeArray
     * @param id
     * @returns
     */
    findAndReorder(data: any, id: any, item: any, index: number) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data[i].children.splice(index, 0, item);
            } else {
                this.findAndReorder(data[i].children, id, item, index);
            }
        }
    }
    /**
     * Find and add element as a child for parent id
     * @param nodeArray
     * @param id
     * @returns
     */
    findAndAdd(data: any, id: any, item: any) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data[i].children.push(item);
            } else {
                this.findAndAdd(data[i].children, id, item);
            }
        }
        return data;
    }
    /**
     * Find and remove element from list by id
     * @param nodeArray
     * @param id
     * @returns
     */
    removeNodeById = (nodeArray: any, id: any) => {
        return nodeArray.filter((node: any) => {
            if (node.id === id) {
                return false;
            } else if (node.children) {
                node.children = this.removeNodeById(node.children, id);
            }
            return true;
        });
    };
    /**
     * Description: This function is used to create a random name for id and name
     * @param e: any
     */
    makeid(length: number) {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}