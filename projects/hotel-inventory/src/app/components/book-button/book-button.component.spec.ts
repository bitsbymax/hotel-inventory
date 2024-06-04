import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookButtonComponent } from './book-button.component';

describe('BookButtonComponent', () => {
  let component: BookButtonComponent;
  let fixture: ComponentFixture<BookButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
