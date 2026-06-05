package com.cloudopshire.notification.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor @Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@cloudopshire.com}")
    private String fromEmail;

    public void sendWelcomeEmail(String to, String firstName) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(fromEmail);
            msg.setTo(to);
            msg.setSubject("Welcome to CloudOpsHire!");
            msg.setText("Hi " + firstName + ",\n\n" +
                "Welcome to CloudOpsHire! Your account is ready.\n\n" +
                "Start exploring jobs now.\n\nBest,\nCloudOpsHire Team");
            mailSender.send(msg);
            log.info("Welcome email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send welcome email to {}: {}", to, e.getMessage());
        }
    }

    public void sendApplicationStatusEmail(String to, String name,
            String jobTitle, String company, String status) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(fromEmail);
            msg.setTo(to);
            msg.setSubject("Application Update: " + jobTitle + " at " + company);
            msg.setText("Hi " + name + ",\n\n" +
                "Your application for " + jobTitle + " at " + company +
                " has been updated.\n\nStatus: " + status.replace("_", " ") +
                "\n\nLog in to CloudOpsHire to view details.\n\nBest,\nCloudOpsHire Team");
            mailSender.send(msg);
            log.info("Status email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send status email to {}: {}", to, e.getMessage());
        }
    }

    public void sendApplicationConfirmation(String to, String name,
            String jobTitle, String company) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(fromEmail);
            msg.setTo(to);
            msg.setSubject("Application Received: " + jobTitle);
            msg.setText("Hi " + name + ",\n\n" +
                "We received your application for " + jobTitle + " at " + company + ".\n\n" +
                "We'll review it and get back to you soon.\n\nBest,\nCloudOpsHire Team");
            mailSender.send(msg);
        } catch (Exception e) {
            log.error("Failed to send confirmation email: {}", e.getMessage());
        }
    }
}