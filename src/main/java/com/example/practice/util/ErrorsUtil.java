package com.example.practice.util;

import com.example.practice.util.exceptions.UserException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

public class ErrorsUtil {

    public static void returnErrorToClient(BindingResult bindingResult) {
        StringBuilder errorMessage = new StringBuilder();

        List<FieldError> errors = bindingResult.getFieldErrors();
        errors.forEach(e -> errorMessage.append(e.getField())
                .append("-")
                .append(e.getDefaultMessage() == null ? e.getCode() : e.getDefaultMessage())
                .append(";"));

        throw new UserException(errorMessage.toString());
    }
}
