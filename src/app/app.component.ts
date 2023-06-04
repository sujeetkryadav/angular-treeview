import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecom';
  click() {
    alert("asds")
  }
  data = [
    {
      name: 'ABC',
      id: 1,
      isopen: false,
      children: [
        {
          name: 'ABC Child 1',
          children: [],
          id: 2,
          isopen: false,
        },
        {
          name: 'ABC Child 2',
          children: [
            {
              name: 'ABC Child 1',
              children: [],
              id: 3,
              isopen: false,
            },
            {
              name: 'ABC Child 2',
              children: [
                {
                  name: 'ABC Child 1',
                  children: [
                    {
                      name: 'ABC Child 1',
                      children: [],
                      id: 4,
                      isopen: false,
                    },
                    {
                      name: 'ABC Child 2',
                      children: [],
                      id: 5,
                      isopen: false,
                    },
                  ],
                  id: 6,
                  isopen: false,
                },
                {
                  name: 'ABC Child 2',
                  children: [],
                  id: 7,
                  isopen: false,
                },
              ],
              id: 8,
              isopen: false,
            },
          ],
          id: 9,
          isopen: false,
        },
      ],
    },
    {
      name: 'ABCD',
      id: 10,
      isopen: false,
      children: [
        {
          name: 'ABCD Child 1',
          children: [],
          id: 11,
          isopen: false,
        },
        {
          name: 'ABCD Child 2',
          children: [],
          id: 12,
          isopen: false,
        },
      ],
    },
    {
      name: 'ABCDE',
      id: 13,
      isopen: false,
      children: [
        {
          name: 'ABCDE Child 1',
          children: [],
          id: 14,
          isopen: false,
        },
        {
          name: 'ABCDE Child 2',
          children: [],
          id: 15,
          isopen: false,
        },
      ],
    },
    {
      name: 'ABCDE',
      id: 16,
      isopen: false,
      children: [
        {
          name: 'ABCDE Child 1',
          children: [],
          id: 17,
          isopen: false,
        },
        {
          name: 'ABCDE Child 2',
          children: [],
          id: 18,
          isopen: false,
        },
      ],
    },
    {
      name: 'ABCDE',
      id: 18,
      isopen: false,
      children: [
        {
          name: 'ABCDE Child 1',
          children: [],
          id: 20,
          isopen: false,
        },
        {
          name: 'ABCDE Child 2',
          children: [],
          id: 21,
          isopen: false,
        },
      ],
    },
    {
      name: 'ABCDE 22',
      children: [],
      id: 22,
      isopen: false,
    },
  ];
}
