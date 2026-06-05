package com.cloudopshire.auth.exception;

@SuppressWarnings("serial")
public class AuthException extends RuntimeException {
    public AuthException(String message) {
        super(message);
    }
}