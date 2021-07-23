import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentUpdatingComponent } from './comment-updating.component';

describe('CommentUpdatingComponent', () => {
  let component: CommentUpdatingComponent;
  let fixture: ComponentFixture<CommentUpdatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentUpdatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentUpdatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
