import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { FormsModule } from "@angular/forms";
// import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-filterbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './filterbar.html',
  styleUrls: ['./filterbar.css']
})
export class Filterbar implements OnInit {
  
  @Output() updateProducts = new EventEmitter<any[]>();

  SORT = ["Latest arrivals", "Price: Low to high", "Price: High to low"];
  COLORS = [
    "all colors","black","blue","brown","burgundy","gray","green",
    "navy","orange","pink","purple","red","tan","white","yellow"
  ];

  isOpen = false;
  width = window.innerWidth;

  // constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  toggleMenu() {
    if (this.width < 768) {
      this.isOpen = !this.isOpen;
    }
  }

  // async fetchProducts(priceQuery: string = "") {
  //   const data = await this.productService.sortProductByPrice(priceQuery).toPromise();
  //   this.updateProducts.emit(data);
  // }

  // handleSearch(option: string) {
  //   if (option === "Price: Low to high") {
  //     this.fetchProducts("low");
  //   } else if (option === "Price: High to low") {
  //     this.fetchProducts("high");
  //   } else {
  //     this.fetchProducts();
  //   }
  // }
}
