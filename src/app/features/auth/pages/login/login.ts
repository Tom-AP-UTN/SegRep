import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class Login {

    constructor(private session: SessionService, private router: Router) {}

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    get email() { return this.form.get('email')!; }
    get password() { return this.form.get('password')!; }

    errorMsg = '';

    onLogin() {

        this.errorMsg = '';

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const email = this.email.value!;
        const password = this.password.value!;

        this.session.login(email, password).subscribe(user => {

            if (!user) {
                this.errorMsg = 'Credenciales incorrectas';
                return;
            }

            // Redirección correcta según rol
            if (user.rol === 'tecnico') {
                this.router.navigate(['/app/tickets/dashboard']);
            } else {
                this.router.navigate(['/app/mis-tickets/dashboard']);
            }
        });
    }

    goRegister() {
        this.router.navigate(['/public/register']);
    }

}
