import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

interface Car {
  plate: string;
  brand: string;
  model: string;
  year: string;
  company: string;
  mobileNumber: string;
}
interface Warehouse {
  address: string;
  firstCorner: string;
  secondCorner: string;
}
interface Profile {
  name: {
    firstName: string,
    lastName: string
  };
  email: string;
  document: {
    idType: string,
    idNumber: string
  };
  contactPhone: string;
  warehouses: Warehouse[];
  isDriver: string;
  driverCars: Car[];
  isOwner: string;
  ownerCars: Car[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  uid: string;
  profileDocument: AngularFirestoreDocument<Profile>;
  profileObservable: Observable<Profile>;

  basicForm: FormGroup;
  vendorForm: FormGroup;
  allIdTypes = ['C.I.', 'RUT', 'Pasaporte'];

  constructor(public authService: AuthService, private fb: FormBuilder, public afs: AngularFirestore) {
  }

  ngOnInit() {
    this.authService.currentUser().subscribe(
      (user) => {
        this.uid = user.uid;
        this.profileDocument = this.afs.doc('profiles/' + this.uid);
        this.profileObservable = this.profileDocument.valueChanges();
        this.profileObservable.subscribe( profile => this.basicForm.patchValue(profile));
      }
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
      documentId: this.fb.group({
        idType: ['', Validators.required],
        idNumber: ['', [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$')
        ]]
      }),
      contactPhone: ['', [
        Validators.required,
        Validators.pattern('^(09|[1-9]|[0-9]*)$')
      ]],
      warehouses: this.fb.array([]),
      isDriver: '',
      driverCars: this.fb.array([]),
      isOwner: '',
      ownerCars: this.fb.array([])
    });

    this.basicForm.valueChanges.subscribe(val => {
      this.profileDocument.update(val);
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

  saveProfile() {
    const _profile = this.basicForm.value;

    const path = `profiles/${this.uid}`;
    this.afs.doc(path).set(_profile);
    console.log(JSON.stringify(_profile));
  }
}

class IdTypes {
  constructor(public description: string) {
  }
}

