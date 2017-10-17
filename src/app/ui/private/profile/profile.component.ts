import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  uid: string;
  basicForm: FormGroup;
  vendorForm: FormGroup;
  allIdTypes = [
    new IdTypes(1, 'C.I.'),
    new IdTypes(2, 'RUT'),
    new IdTypes(3, 'Pasaporte')
  ];
  profile: FirebaseObjectObservable<any>;

  constructor(public authService: AuthService, private fb: FormBuilder, private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.authService.currentUser().subscribe(
      (user) => this.uid = user.uid
    );

    this.basicForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ]],
      document: this.fb.group({
        idType: ['', Validators.required],
        idNumber: ['', [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$')
        ]]
      }),
      contactPhone: ['', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$')
      ]],
      warehouses: this.fb.array([]),
      isDriver: '',
      driverCars: this.fb.array([]),
      isOwner: '',
      ownerCars: this.fb.array([])
    });
  }

  onAddVendorWarehouse () {
    (<FormArray>this.basicForm.controls['warehouses']).push(
      this.fb.group({
        address: ['', Validators.required],
        firstCorner: '',
        secondCorner: ''
      })
    );
  }

  onRemoveVendorWarehouse (index) {
    (<FormArray>this.basicForm.controls['warehouses']).removeAt(index);
  }

  onAddDriverCar () {
    (<FormArray>this.basicForm.controls['driverCars']).push(
      this.fb.group({
        plate: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        year: ['', Validators.required],
        company: ['', Validators.required],
        mobileNumber: ['', Validators.required]
      })
    );
  }

  onRemoveDriverCar (index) {
    (<FormArray>this.basicForm.controls['driverCars']).removeAt(index);
  }


  onAddOwnerCar () {
    (<FormArray>this.basicForm.controls['ownerCars']).push(
      this.fb.group({
        plate: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        year: ['', Validators.required],
        company: ['', Validators.required],
        mobileNumber: ['', Validators.required]
      })
    );
  }

  onRemoveOwnerCar (index) {
    (<FormArray>this.basicForm.controls['ownerCars']).removeAt(index);
  }

}

export class IdTypes {
  constructor(public id: number, public description: string) {
  }
}

