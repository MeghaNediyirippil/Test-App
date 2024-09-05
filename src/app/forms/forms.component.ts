import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
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

export class FormsComponent implements AfterViewInit {
  @ViewChild('popoverTrigger1', { static: false }) popoverTrigger1!: ElementRef;
  @ViewChild('popoverTrigger2', { static: false }) popoverTrigger2!: ElementRef;
  @ViewChild('popoverTrigger3', { static: false }) popoverTrigger3!: ElementRef;
  @ViewChild('popoverTrigger4', { static: false }) popoverTrigger4!: ElementRef;
  @ViewChild('dob', { static: false }) dobElement!: ElementRef;
  @ViewChild('commentsPopover', { static: false }) commentsElement!: ElementRef;  

  popoverText = 'superuser';
  popoverEmpty = 'Empty';
  selectedSex = 'not selected';
  dateSelected: string = '1984-05-15';

  awesome='awesome user!'

  // color picker
  selectedColor: string = '#00000';

  // date picker
  selectedDate: string = '1-2-2024';

  // scroller
  percentage: number = 90;
  thumbPosition: number = 90; // Initialize position

  // countries
  selectedCountry: string = '';
  countries: Country[] = [];
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

  // tags
  tagControl = new FormControl<string | null>('');
  tags: string[] = [];


  constructor(
    private timezoneService: TimezoneService,
    private countryService: CountryService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private elementRef: ElementRef,
    ) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // language
    this.languageService.getLanguages().subscribe({
      next: (data) => {
        this.languages = data;
        // console.log('Languages:', this.languages); // Debugging
      },
      error: (err) => {
        console.error('Error fetching languages:', err);
        this.languages = {};
      }
    });

    // currency
    this.currencyService.getCurrencies().subscribe((data: { [key: string]: Currency }) => {
      this.currencies = data;
    });

    // time zone
    this.timezoneService.getTimezones().subscribe(data => {
      this.timezones = data.timezones;
    });

    // country
    this.countryService.getCountries().subscribe({
      next: (data: Country[]) => {
        this.countries = data;
        this.selectedCountry = this.countries[0]?.name.common || '';
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
        this.countries = [];
      }
    });

  }

  ngAfterViewInit() {
    // Initialize popovers with different content based on the specific trigger
    this.initializePopover(this.popoverTrigger1.nativeElement, this.popoverText);
    this.initializePopover(this.popoverTrigger2.nativeElement, this.popoverEmpty);
    this.initializeDropdownPopover(this.popoverTrigger3.nativeElement);
    this.initializeDropdownPopover(this.popoverTrigger4.nativeElement);
    this.initializeDatePopover(this.dobElement.nativeElement, this.dateSelected);
    this.initializeCommentsPopover(this.commentsElement.nativeElement);
      }

  initializePopover(element: HTMLElement, content: string) {
    const popoverInstance = new bootstrap.Popover(element, {
      html: true,
      content: this.getPopoverContent(content),  // Pass content dynamically
      sanitize: false,
    });

    // Listen for the 'shown.bs.popover' event to attach button event listeners
    element.addEventListener('shown.bs.popover', () => {
      this.addEventListenersToPopoverButtons(element);
    });
  }
  // dropdown
  initializeDropdownPopover(element: HTMLElement) {
    new bootstrap.Popover(element, {
      html: true,
      content: this.getDropdownPopoverContent(),
      sanitize: false
    });

    element.addEventListener('shown.bs.popover', () => {
      this.addDropdownEventListeners(element);
    });
  }

  getPopoverContent(content: string) {
    return `
      <div class="popover-content d-flex p-0 m-0">
        <input 
          type="text" 
          id="popoverTextInPopover" 
          class="form-control" 
          value="${content}" 
        />
        <div class="popover-buttons d-flex">
          <button id="popoverSave" class="btn btn-primary btn-sm mx-3"> <i class="fa-solid fa-check"></i></button>
          <button id="popoverClose" class="btn btn-secondary btn-sm"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `;
  }

  getDropdownPopoverContent() {
    return `
      <div class="popover-content d-flex p-0 m-0">
        <select id="popoverDropdown" class="form-select">
          <option value="not selected" ${this.selectedSex === 'not selected' ? 'selected' : ''}>not selected</option>
          <option value="male" ${this.selectedSex === 'male' ? 'selected' : ''}>Male</option>
          <option value="female" ${this.selectedSex === 'female' ? 'selected' : ''}>Female</option>
        </select>
        <div class="popover-buttons d-flex mt-2">
          <button id="popoverSaveDropdown" class="btn btn-primary btn-sm mx-3"> <i class="fa-solid fa-check"></i></button>
          <button id="popoverCloseDropdown" class="btn btn-secondary btn-sm"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `;
  }

  addEventListenersToPopoverButtons(popoverElement: HTMLElement) {
    const popoverSaveButton = document.getElementById('popoverSave');
    const popoverCloseButton = document.getElementById('popoverClose');
    const popoverTextInput = document.getElementById('popoverTextInPopover') as HTMLInputElement;

    if (popoverSaveButton && popoverCloseButton && popoverTextInput) {
      popoverSaveButton.addEventListener('click', () => {
        const newText = popoverTextInput.value;

        // Update the respective content variable based on the popover element
        if (popoverElement === this.popoverTrigger1.nativeElement) {
          this.popoverText = newText;
        } else if (popoverElement === this.popoverTrigger2.nativeElement) {
          this.popoverEmpty = newText;
        }

        this.updatePopoverContent(popoverElement, newText);
        this.closePopover(popoverElement);
      });

      popoverCloseButton.addEventListener('click', () => {
        this.closePopover(popoverElement);
      });
    }
  }
  // drop down
  addDropdownEventListeners(popoverElement: HTMLElement) {
    const popoverSaveButton = document.getElementById('popoverSaveDropdown');
    const popoverCloseButton = document.getElementById('popoverCloseDropdown');
    const popoverDropdown = document.getElementById('popoverDropdown') as HTMLSelectElement;

    if (popoverSaveButton && popoverCloseButton && popoverDropdown) {
      popoverSaveButton.addEventListener('click', () => {
        this.selectedSex = popoverDropdown.value;
        this.updatePopoverContent(popoverElement, this.selectedSex);
        this.closePopover(popoverElement);
      });

      popoverCloseButton.addEventListener('click', () => {
        this.closePopover(popoverElement);
      });
    }
  }
  updatePopoverContent(element: HTMLElement, newContent: string) {
    const popoverInstance = bootstrap.Popover.getInstance(element);
    if (popoverInstance) {
      popoverInstance.dispose(); // Dispose the current instance
      new bootstrap.Popover(element, { // Recreate the popover with updated content
        html: true,
        content: this.getPopoverContent(newContent),
        sanitize: false,
      });
    }
  }
  closePopover(popoverElement: HTMLElement) {
    const popoverInstance = bootstrap.Popover.getInstance(popoverElement);
    if (popoverInstance) {
      popoverInstance.hide();
    }
  }


  // date popover
  initializeDatePopover(element: HTMLElement, date: string) {
    const popover = new bootstrap.Popover(element, {
      html: true,
      content: this.getDatePopoverContent(date),
      sanitize: false,
      placement: 'bottom'
    });

    // Update the popover when shown
    element.addEventListener('shown.bs.popover', () => {
      this.initializeDatePicker();
    });


  }

  getDatePopoverContent(date: string) {
    return `
      <div class="popover-content d-flex p-0 m-0">
        <input type="date" id="datePickerInput" class="form-control" value="${this.dateSelected}" />
        <div class="popover-buttons d-flex mt-2">
          <button id="popoverSaveDate" class="btn btn-primary btn-sm mx-3"> <i class="fa-solid fa-check"></i></button>
          <button id="popoverCloseDate" class="btn btn-secondary btn-sm"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `;
  }

  initializeDatePicker() {
    const datePickerElement = document.getElementById('datePickerInput') as HTMLInputElement;
      if (datePickerElement) {
      const saveButton = document.getElementById('popoverSaveDate');
      const closeButton = document.getElementById('popoverCloseDate');

      if (saveButton && closeButton) {
        saveButton.addEventListener('click', () => {
          this.dateSelected = datePickerElement.value;
          this.updateDatePopoverContent(this.dobElement.nativeElement, this.dateSelected);
          this.closePopover(this.dobElement.nativeElement);
        });

        closeButton.addEventListener('click', () => {
          this.closePopover(this.dobElement.nativeElement);
        });
      }
    }
  }

  updateDatePopoverContent(element: HTMLElement, newDate: string) {
    const popoverInstance = bootstrap.Popover.getInstance(element);
    if (popoverInstance) {
      popoverInstance.dispose(); // Dispose the current instance
    }
    
    new bootstrap.Popover(element, {
      html: true,
      content: this.getDatePopoverContent(newDate),
      sanitize: false,
      placement: 'bottom'
    });
  }



// popover comment
// Initialize Comments Popover
initializeCommentsPopover(element: HTMLElement) {
  const popover = new bootstrap.Popover(element, {
    html: true,
    content: this.getCommentsPopoverContent(),
    sanitize: false,
    placement: 'bottom'
  });

  element.addEventListener('shown.bs.popover', () => {
    this.initializePopoverEvents();
  });
}

// Get Comments Popover Content
getCommentsPopoverContent() {
  return `
    <div class="popover-content p-0 m-0">
      <textarea id="commentsTextarea" class="form-control" rows="3">${this.awesome}</textarea>
      <div class="popover-buttons d-flex mt-2">
        <button id="popoverSaveComments" class="btn btn-primary btn-sm mx-3"><i class="fa-solid fa-check"></i></button>
        <button id="popoverCloseComments" class="btn btn-secondary btn-sm"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  `;
}

// Initialize Popover Events
initializePopoverEvents() {
  const saveButton = document.getElementById('popoverSaveComments');
  const closeButton = document.getElementById('popoverCloseComments');
  const commentsTextarea = document.getElementById('commentsTextarea') as HTMLTextAreaElement;

  if (saveButton && closeButton && commentsTextarea) {
    saveButton.addEventListener('click', () => {
      this.saveComment(commentsTextarea.value);
      this.closePopoverr();
    });

    closeButton.addEventListener('click', () => {
      this.closePopoverr();
    });

    // Optionally, handle "ctrl+enter" to save
    commentsTextarea.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        this.saveComment(commentsTextarea.value);
        this.closePopoverr();
      }
    });
  }
}

// Save Comment and Update the Popover
saveComment(newComment: string) {
  this.awesome = newComment; // Update the comment text
  this.updateCommentsPopoverContent(this.commentsElement.nativeElement, this.awesome);
  console.log('New comment:', newComment); // Replace with actual save logic
}

// Update Comments Popover Content
updateCommentsPopoverContent(element: HTMLElement, newComment: string) {
  const popoverInstance = bootstrap.Popover.getInstance(element);
  if (popoverInstance) {
    popoverInstance.dispose(); // Dispose the current instance
    new bootstrap.Popover(element, {
      html: true,
      content: this.getCommentsPopoverContent(),
      sanitize: false,
      placement: 'bottom'
    });
  }
}

// Close Popover
closePopoverr() {
  const popoverInstance = bootstrap.Popover.getInstance(this.commentsElement.nativeElement);
  if (popoverInstance) {
    popoverInstance.hide();
  }
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