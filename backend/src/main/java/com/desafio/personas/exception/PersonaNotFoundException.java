package com.desafio.personas.exception;

public class PersonaNotFoundException extends RuntimeException {
    public PersonaNotFoundException(String msg) {
        super(msg);
    }
}
