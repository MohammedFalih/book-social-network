package com.falih.book_network.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {

    @NotNull(message = "Firstname is mandatary")
    @NotBlank(message = "Firstname is mandatory")
    private String firstname;

    @NotNull(message = "Lastname is mandatary")
    @NotBlank(message = "Lastname is mandatory")
    private String lastname;

    @NotNull(message = "Email is mandatary")
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is not well formatted")
    private String email;

    @NotNull(message = "Password is mandatary")
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be atleast 8 characters long")
    private String password;

}
