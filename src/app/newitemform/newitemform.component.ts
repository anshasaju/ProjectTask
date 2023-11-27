import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newitemform',
  templateUrl: './newitemform.component.html',
  styleUrls: ['./newitemform.component.css']
})
export class NewitemformComponent implements OnInit {
  mainForm!: FormGroup;
  // formArray!: FormArray;


  formArray: any[] = [];
  itemList: any[] = [];

  itemDataList = [
    {
      "id": 1,
      "title": "title 1",
      "children": [
        {
          "id": 2,
          "title": " title 2",
          "children": [
            {
              "id": 3,
              "title": " title 3",
              "children": [
                {
                  "id": 4,
                  "title": " title 4",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": " title 6",
      "children": []
    },
    {
      "id": 7,
      "title": " title 7",
      "children": [
        {
          "id": 8,
          "title": " title 8",
          "children": [
            {
              "id": 9,
              "title": " title 9",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": 10,
      "title": " title 10",
      "children": []
    }
  
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.mainForm = this.fb.group({
      itemSelect: [''],
      titleInput: ['']
    })

    this.itemDataList.forEach(task => {
      const itemList = this.fb.group({
        id: task.id,
        title: task.title,
        children: this.fb.array([]),
      })
      this.formArray.push(itemList);
    })

    // console.log(this.itemDataList)
  }


  addToForm(){
    debugger
    const id = this.getUniqueId();
    const title = this.mainForm.get('titleInput')?.value;
    const item = this.mainForm.get('itemSelect')?.value;

    const newFormGroup = 
    this.fb.group({
      id: id,
      title: title
    })

    if(item){
      const itemIndex = this.formArray.findIndex(control => 
        control.get('id')?.value == item  
      )

      const itemChildren = this.formArray[itemIndex].get('children') as FormArray;

      itemChildren.push(newFormGroup)
      // console.log(itemChildren, "itemDataList", this.itemDataList)
    }else{
      this.formArray.push(newFormGroup);
      this.itemDataList.push(newFormGroup.value);
    }

    this.mainForm.get('titleInput')?.setValue('');
    this.mainForm.get('itemSelect')?.setValue('');
  }

  onItemSelectChange(mainForm: FormGroup){
    debugger
    const itemId = this.mainForm.get('itemSelect')?.value;
    if(itemId){
      const itemIndex = this.formArray.findIndex( control => 
        control.get('id')?.value == itemId  
      )

      const itemTitle = this.formArray[itemIndex].get('title')?.value

      this.mainForm.get('titleInput')?.setValue(`Sub-task of ${itemTitle}`)
    }
  }


  getUniqueId(){
    return Math.floor(Math.random()*1000);
  }
}
