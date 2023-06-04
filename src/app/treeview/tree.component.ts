import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
    @Input() data: any;
    @Input() eleID: string = "";
    parentId: any = 0;
    currentData: any;
    children = [];
    constructor() { }
    ngOnInit() {

    }

    openChild = ($event: any, item: any) => {
        if (item.children && item.children.length > 0) item.isopen = !item.isopen;
        $event.stopPropagation();
    };
    click($event: any, item: any) {
        console.log('Selected Item-->', item);
        $event.stopPropagation();
    }
    allowDrop(ev: any) {
        document.querySelectorAll('li.re-order').forEach(function (e: any) {
            e['style'].border = 'none';
            e['style'].height = '0px';
        });
        if (ev.target.classList.contains('re-order')) {
            ev.target.style.borderBottom = '2px solid';
            ev.target.style.borderColor = 'blue';
            ev.target.style.height = '1px';
        }
        document.querySelectorAll('li.list-item').forEach(function (e: any) {
            e.children[0]['style'].border = 'none';
            e.children[0]['style'].marginBottom = '10px';

        });
        if (ev.target.closest('li.list-item')) {
            ev.target.closest('li.list-item').children[0].style.border = '1px solid';
            ev.target.closest('li.list-item').children[0].style.borderColor = 'green';
        }

        ev.preventDefault();
    }

    drag(ev: any, item: any) {
        ev.dataTransfer.setData('text', JSON.stringify(item));

    }

    drop(ev: any, id: any) {
        document.querySelectorAll('li.list-item').forEach(function (e: any) {
            e['style'].border = 'none';
        });
        document.querySelectorAll('li.re-order').forEach(function (e: any) {
            e['style'].border = 'none';
            e['style'].height = '0px';
        });
        console.log(ev.target)
        if (ev.target.classList.contains('re-order')) {
            //Re-ordering
            console.log("reordering")
        } else {
            let parentId = ev.target.closest('li').dataset['parent'];
            var data = ev.dataTransfer.getData('text');
            let currentID = JSON.parse(data).id
            if (parentId != currentID) {

                this.data = this.removeNodeById(this.data, currentID);
                this.data = this.findAndAdd(this.data, parentId, JSON.parse(data));
                console.log("updated dataset", this.data);
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
}
