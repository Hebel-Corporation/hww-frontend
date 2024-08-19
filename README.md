*Zod schema for password config*

const PasswordSchema = z.object({
    password: z.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
        .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
        .regex(/[@$!%*?&]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    confirmPassword: z.string().min(6, 'Le mot de passe de confirmation doit comporter au moins 6 caractères')
        .regex(/[A-Z]/, 'Le mot de passe de confirmation doit contenir au moins une lettre majuscule.')
        .regex(/[a-z]/, 'Le mot de passe de confirmation doit contenir au moins une lettre minuscule.')
        .regex(/\d/, 'Confirm Password must contain at least one digit')
        .regex(/[@$!%*?&]/, 'Confirm Password must contain at least one special character'),
}).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ['confirmPassword'],
});