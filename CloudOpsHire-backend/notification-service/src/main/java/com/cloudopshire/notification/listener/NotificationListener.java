package com.cloudopshire.notification.listener;

import com.cloudopshire.notification.config.RabbitMQConfig;
import com.cloudopshire.notification.dto.*;
import com.cloudopshire.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component @RequiredArgsConstructor @Slf4j
public class NotificationListener {

    private final EmailService emailService;

    @RabbitListener(queues = RabbitMQConfig.APP_STATUS_QUEUE)
    public void onApplicationEvent(ApplicationEvent event) {
        log.info("Received application event: {}", event.getNewStatus());
        if ("APPLIED".equals(event.getNewStatus())) {
            emailService.sendApplicationConfirmation(
                event.getCandidateEmail(), event.getCandidateName(),
                event.getJobTitle(), event.getCompanyName());
        } else {
            emailService.sendApplicationStatusEmail(
                event.getCandidateEmail(), event.getCandidateName(),
                event.getJobTitle(), event.getCompanyName(), event.getNewStatus());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.EMAIL_QUEUE)
    public void onUserRegistered(UserRegisteredEvent event) {
        log.info("User registered: {}", event.getEmail());
        emailService.sendWelcomeEmail(event.getEmail(), event.getFirstName());
    }
}