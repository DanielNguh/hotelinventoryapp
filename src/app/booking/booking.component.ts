import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }
  constructor(
    private config: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomId, disabled: true },
          { validators: [Validators.required] }
        ),
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: ['', { updateOn: 'blur' }],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidator.ValidateName,
            CustomValidator.ValidateSpecialChar('*'),
          ],
        ],
        address: this.fb.group({
          addressLine: ['', [Validators.required]],
          addressLine2: [''],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          country: [''],
          zipCode: [''],
        }),
        guests: this.fb.array([this.addGuestControl()]),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      },
      { updateOn: 'blur', validators: [CustomValidator.ValidateDate] }
    );

    // this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data)
    // });

    this.bookingForm.valueChanges
      .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {console.log(data);
    // })
    this.bookingForm.reset({
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'another@gmail.com',
      checkinDate: new Date('1/12/2023'),
      checkoutDate: new Date('23/12/2023'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: new Date('1/11/2023'),
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine: 'Small Soppo',
        addressLine2: '',
        city: 'Buea',
        state: 'South West',
        country: 'Cameroon',
        zipCode: '11234',
      },
    });
  }
  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', [Validators.required]],
      age: new FormControl(''),
    });
  }
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
