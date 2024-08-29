import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Import CommonModule and FormsModule for form controls
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  data = [
    { engine: 'Trident', browser: 'Internet Explorer 4.0', platform: 'Win 95+', version: '4', grade: 'X' },
    { engine: 'Trident', browser: 'Internet Explorer 5.0', platform: 'Win 95+', version: '5', grade: 'C' },
    { engine: 'Trident', browser: 'Internet Explorer 5.5', platform: 'Win 95+', version: '5.5', grade: 'A' },
    { engine: 'Trident', browser: 'Internet Explorer 6', platform: 'Win 98+', version: '6', grade: 'A' },
    { engine: 'Trident', browser: 'Internet Explorer 7', platform: 'Win XP SP2+', version: '7', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 1.0', platform: 'Win 98+ / OSX.2+', version: '1.7', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 1.5', platform: 'Win 98+ / OSX.2+', version: '1.8', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 2.0', platform: 'Win 98+ / OSX.2+', version: '1.8', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 3.0', platform: 'Win 2k+ / OSX.3+', version: '1.9', grade: 'A' },
    { engine: 'Webkit', browser: 'Safari 3.0', platform: 'OSX.4+', version: '522.1', grade: 'A' },
    { engine: 'Webkit', browser: 'Safari 4.0', platform: 'OSX.4+', version: '530.1', grade: 'A' },
    { engine: 'Presto', browser: 'Opera 9.0', platform: 'Win 95+ / OSX.3+', version: '-', grade: 'A' },
    { engine: 'Presto', browser: 'Opera 9.2', platform: 'Win 88+ / OSX.3+', version: '-', grade: 'A' },
    { engine: 'Misc', browser: 'NetFront 3.1', platform: 'Embedded devices', version: '-', grade: 'C' },
    { engine: 'Trident', browser: 'Internet Explorer 8', platform: 'Win 7+', version: '8', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 4.0', platform: 'Win 2k+ / OSX.3+', version: '4.0', grade: 'A' },
    { engine: 'Webkit', browser: 'Safari 5.0', platform: 'OSX.5+', version: '5.0', grade: 'A' },
    { engine: 'Presto', browser: 'Opera 10.0', platform: 'Win 7+', version: '10.0', grade: 'A' },
    { engine: 'Trident', browser: 'Internet Explorer 9', platform: 'Win 7+', version: '9', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 5.0', platform: 'Win 2k+ / OSX.3+', version: '5.0', grade: 'A' },
    { engine: 'Webkit', browser: 'Safari 6.0', platform: 'OSX.6+', version: '6.0', grade: 'A' },
    { engine: 'Presto', browser: 'Opera 11.0', platform: 'Win 7+', version: '11.0', grade: 'A' },
    { engine: 'Misc', browser: 'Brew MP 2.0', platform: 'Embedded devices', version: '2.0', grade: 'B' },
    { engine: 'Trident', browser: 'Internet Explorer 10', platform: 'Win 8+', version: '10', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 6.0', platform: 'Win 2k+ / OSX.3+', version: '6.0', grade: 'A' },
    { engine: 'Webkit', browser: 'Safari 7.0', platform: 'OSX.7+', version: '7.0', grade: 'A' },
    { engine: 'Presto', browser: 'Opera 12.0', platform: 'Win 7+', version: '12.0', grade: 'A' },
    { engine: 'Misc', browser: 'Skyfire 4.0', platform: 'Embedded devices', version: '4.0', grade: 'B' },
    { engine: 'Trident', browser: 'Internet Explorer 11', platform: 'Win 8.1+', version: '11', grade: 'A' },
    { engine: 'Gecko', browser: 'Firefox 7.0', platform: 'Win 2k+ / OSX.3+', version: '7.0', grade: 'A' },
    { engine: 'Webkit', browser: 'Safari 8.0', platform: 'OSX.8+', version: '8.0', grade: 'A' },
    { engine: 'Presto', browser: 'Opera 15.0', platform: 'Win 8+', version: '15.0', grade: 'A' },
    { engine: 'Misc', browser: 'Kindle 2.0', platform: 'Embedded devices', version: '2.0', grade: 'B' }
  ];
  

  searchQuery = ''; // For search input
  currentPage = 1;
  pageSize = 5;  // Default items per page
  rowsPerPage = this.pageSize;

  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.rowsPerPage);
  }

  // Filtered data based on search query
  get filteredData() {
    if (!this.searchQuery) {
      return this.data;
    }

    const query = this.searchQuery.toLowerCase();

    return this.data.filter(row =>
      row.engine.toLowerCase().includes(query) ||
      row.browser.toLowerCase().includes(query) ||
      row.platform.toLowerCase().includes(query) ||
      row.version.toLowerCase().includes(query) ||
      row.grade.toLowerCase().includes(query)
    );
  }

  // Calculate the rows to display for the current page
  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  // Method to change the page
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Method to refresh the data based on the selected page size
  refreshCountries() {
    this.rowsPerPage = this.pageSize;
    this.currentPage = 1;  // Reset to the first page whenever page size changes
  }

  // Method to reset page number on search
  onSearch() {
    this.currentPage = 1;
  }
}
