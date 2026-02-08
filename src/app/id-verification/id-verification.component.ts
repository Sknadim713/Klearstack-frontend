
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../Core/service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-id-verification',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './id-verification.component.html',
  styleUrl: './id-verification.component.css'
})
export class IdVerificationComponent implements OnInit {

  // right side list
  idList = signal<any[]>([]);

  // selected id
  selectedIdCode = signal<string>('');

  // form schema from API
  formSchema = signal<any>(null);

  // dynamic form group
  DocumentForm!: FormGroup;

  constructor(private ApiService: ServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.DocumentForm = this.fb.group({});
    this.getIdList();
  }

  // Right side list
  getIdList() {
    this.ApiService.getidlist().subscribe({
      next: (resp: any) => {
        this.idList.set(resp.data || []);
      },
      error: (error: any) => console.log(error)
    });
  }

  // Select one card
  selectId(item: any) {
    this.selectedIdCode.set(item.idcode);

    this.ApiService.getformcId(item.idcode).subscribe({
      next: (resp: any) => {
        const schema = resp.data; // IMPORTANT
        this.formSchema.set(schema);

        // Create dynamic form
        this.buildDynamicForm(schema.fields || []);
      },
      error: (error: any) => console.log(error)
    });
  }

  // Dynamic Form Builder
  buildDynamicForm(fields: any[]) {
    const group: any = {};

    fields.forEach((field) => {

      // TEXT / NUMBER / EMAIL / DATE
      if (['text', 'number', 'email', 'date'].includes(field.type)) {

        const validators = [];

        if (field.required) validators.push(Validators.required);
        if (field.minLength) validators.push(Validators.minLength(field.minLength));
        if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
        if (field.pattern) validators.push(Validators.pattern(field.pattern));

        group[field.key] = ['', validators];
      }

      // CHECKBOX
      if (field.type === 'checkbox') {
        // checkbox value boolean
        group[field.key] = [false, field.required ? Validators.requiredTrue : []];
      }

      // RADIO / SELECT
      if (field.type === 'radio' || field.type === 'select') {
        group[field.key] = ['', field.required ? Validators.required : []];
      }

    });

    this.DocumentForm = this.fb.group(group);
  }

  // Submit
  submitForm() {
    if (this.DocumentForm.invalid) {
      this.DocumentForm.markAllAsTouched();
      return;
    }

    console.log("Selected ID:", this.selectedIdCode());
    console.log("Form Value:", this.DocumentForm.value);

    alert("Form submitted successfully ✅");
  }

  // Reset
  resetForm() {
    this.DocumentForm.reset();
  }

  // Cancel
  cancelForm() {
    this.selectedIdCode.set('');
    this.formSchema.set(null);
    this.DocumentForm.reset();
  }
}
