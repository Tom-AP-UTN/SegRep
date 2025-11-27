import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SessionService } from '../../../../core/services/session.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})

export class Login {

    email = '';
    password = '';
    error: string | null = null;

    constructor(
        private auth: AuthService,
        private session: SessionService,
        private router: Router
    ) { }

    onSubmit(): void {
        this.error = null;

        this.auth.login(this.email, this.password).subscribe(result => {

            if (result.length === 1) {

                this.session.setUsuarioActivo(result[0]);
                this.router.navigate(['/dashboard']);
            } 
            
            else {
            
                this.error = 'Credenciales inválidas';
            }
        });
    }
}