import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Country, CountryService } from '../services/country.service';
import { LanguageService } from '../services/language.service';
import { KeysPipe } from '../pipes/keys.pipe';
import { CurrencyService } from '../services/currency/currency.service';
import { TimezoneService } from '../services/timezone/timezone.service';
import * as bootstrap from 'bootstrap'; 


interface Currency {
  label: string;
  currencyflag: string;
  symbol: string;
}


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, FormsModule, KeysPipe, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})

export class FormsComponent {
  // color picker
  selectedColor: string = '#00000';
  // date picker
  selectedDate: string = '1-2-2024';
  // scroller
  percentage: number = 90;
  thumbPosition: number = 90; // Initialize thumb position

  // countries
  selectedCountry: string = '';
  countries: Country[] = []; // Use typed Country array
  dropdownOpen: boolean = false;
  selectedCountryFlag: string = '';

  // language
  languages: { [key: string]: string } = {};
  // currency
  currencies: { [key: string]: Currency } = {};
  // time zone
  timezones: any[] = [];

  // font size
  fontSizes = [
    { value: '12px', label: 'Small' },
    { value: '16px', label: 'Normal' },
    { value: '20px', label: 'Large' },
    { value: '24px', label: 'Extra Large' }
  ];

  selectedFontSize: string = '16px';

  // select
  options: string[] = ['Mustard', 'Ketchup', 'Relish'];
  groupedOptions: { label: string, options: string[] }[] = [
    { label: 'Picnic', options: ['Mustard', 'Ketchup', 'Relish'] },
    { label: 'Camping', options: ['Tent', 'Flashlight', 'Toilet Paper'] }
  ];

  selectedOption: string | undefined;
  selectedGroupOption: string | undefined;
  selectedMultipleOptions: string[] = [];

  // masking


  // tags
  tagControl = new FormControl<string | null>('');
  tags: string[] = [];




  constructor(private timezoneService: TimezoneService, private countryService: CountryService,
    private languageService: LanguageService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    // language
    this.languageService.getLanguages().subscribe({
      next: (data) => {
        this.languages = data;
        console.log('Languages:', this.languages); // Debugging
      },
      error: (err) => {
        console.error('Error fetching languages:', err);
        this.languages = {}; // Handle the error appropriately
      }
    });

    // currency
    this.currencyService.getCurrencies().subscribe((data: { [key: string]: Currency }) => {
      this.currencies = data; // Assign the fetched data to the currencies property
    });

    // time zone
    this.timezoneService.getTimezones().subscribe(data => {
      this.timezones = data.timezones;
    });




    // country
    this.countryService.getCountries().subscribe({
      next: (data: Country[]) => {
        this.countries = data; // Directly use the Country type
        this.selectedCountry = this.countries[0]?.name.common || ''; // Use name.common
        console.log(this.countries)
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
        this.countries = []; // Handle the error by resetting or displaying a message
      }
    });

  }



  // tags
  addTag(): void {
    const newTag = this.tagControl.value?.trim() ?? '';
    if (newTag && !this.tags.includes(newTag)) {
      this.tags.push(newTag);
    }
    this.tagControl.setValue('');
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }

  // font size
  onFontSizeChange(fontSize: string): void {
    this.selectedFontSize = fontSize;
    // You can emit this change or apply it directly to your application
    console.log('Selected Font Size:', this.selectedFontSize);
  }
  // language
  getLanguagesKeys(): string[] {
    return Object.keys(this.languages || {});
  }

  // currency
  getCurrenciesKeys(): string[] {
    return Object.keys(this.currencies); // Get the keys from the currencies object
  }

  // multiple select



  selectCountry(country: Country): void {
    this.selectedCountry = country.name.common;
    this.dropdownOpen = false; // Close the dropdown after selection
    this.selectedCountryFlag = country.flags.png;
  }


  // font picker
  fonts = [
    { name: 'Comic Sans MS', family: 'Comic Sans MS, cursive, sans-serif' },
    { name: 'Arial Black', family: 'Arial Black, Gadget, sans-serif' },
    { name: 'Impact', family: 'Impact, Charcoal, sans-serif' },
    { name: 'Lucida Console', family: 'Lucida Console, Monaco, monospace' },
    { name: 'Tahoma', family: 'Tahoma, Geneva, sans-serif' },
    { name: 'Trebuchet MS', family: 'Trebuchet MS, Helvetica, sans-serif' },
    { name: 'Courier', family: 'Courier, monospace' },
    { name: 'Garamond', family: 'Garamond, serif' },
    { name: 'Lucida Sans', family: 'Lucida Sans, sans-serif' },
    { name: 'Palatino', family: 'Palatino Linotype, Book Antiqua, Palatino, serif' },
    { name: 'Segoe UI', family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    { name: 'Tahoma', family: 'Tahoma, Geneva, sans-serif' },
    { name: 'Roboto', family: 'Roboto, sans-serif' },
    { name: 'Open Sans', family: 'Open Sans, sans-serif' },
    { name: 'Dancing Script', family: 'Dancing Script, cursive' },
    { name: 'Lobster', family: 'Lobster, cursive' },
    { name: 'Pacifico', family: 'Pacifico, cursive' },
    { name: 'Arial', family: 'Arial, sans-serif' },
    { name: 'Courier New', family: 'Courier New, monospace' },
    { name: 'Georgia', family: 'Georgia, serif' },
    { name: 'Times New Roman', family: 'Times New Roman, serif' },
    { name: 'Verdana', family: 'Verdana, sans-serif' },

  ];


  selectedFont: string = this.fonts[0].family;
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onFontSelect(fontFamily: string) {
    this.selectedFont = fontFamily;
    this.isOpen = false;
  }

  getSelectedFontName(): string {
    const selected = this.fonts.find(font => font.family === this.selectedFont);
    return selected ? selected.name : 'Select Font';
  }





  // scroller
  updatePercentage(event: Event) {
    const target = event.target as HTMLInputElement;
    this.percentage = target.valueAsNumber;
    this.updateThumbPosition(target.valueAsNumber);
  }

  updateThumbPosition(value: number) {
    // Calculate the percentage of the slider's width
    this.thumbPosition = ((value - 0) / (100 - 0)) * 100;
  }

  // select
  cities = [
    'Amsterdam', 'Atlanta', 'Baltimore', 'Boston', 'Buenos Aires',
    'Calgary', 'Chicago', 'Denver', 'Dubai', 'Frankfurt',
    'Hong Kong', 'Honolulu', 'Houston', 'Kuala Lumpur', 'London',
    'Los Angeles', 'Melbourne', 'Mexico City', 'Miami', 'Minneapolis'
  ];
  selectedCity = this.cities[0]; // Default value

  // wizards
  currentStep: number = 1;

  goToStep(step: number): void {
    this.currentStep = step;
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  isLastStep(): boolean {
    return this.currentStep === 3;
  }






}