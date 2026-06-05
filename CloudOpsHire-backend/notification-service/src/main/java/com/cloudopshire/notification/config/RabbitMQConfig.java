package com.cloudopshire.notification.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Exchange
    public static final String EXCHANGE = "cloudopshire.exchange";

    // Queues
    public static final String EMAIL_QUEUE      = "email.notification.queue";
    public static final String APP_STATUS_QUEUE = "application.status.queue";

    // Routing keys
    public static final String USER_REGISTERED_KEY   = "user.registered";
    public static final String APP_SUBMITTED_KEY     = "application.submitted";
    public static final String APP_STATUS_KEY        = "application.status.changed";

    @Bean
    TopicExchange exchange() {
        return new TopicExchange(EXCHANGE, true, false);
    }

    @Bean
    Queue emailQueue() {
        return QueueBuilder.durable(EMAIL_QUEUE).build();
    }

    @Bean
    Queue appStatusQueue() {
        return QueueBuilder.durable(APP_STATUS_QUEUE).build();
    }

    @Bean
    Binding emailBinding() {
        return BindingBuilder.bind(emailQueue()).to(exchange()).with("user.#");
    }

    @Bean
    Binding appBinding() {
        return BindingBuilder.bind(appStatusQueue()).to(exchange()).with("application.#");
    }

    @SuppressWarnings("removal")
	@Bean
    Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory cf) {
        RabbitTemplate t = new RabbitTemplate(cf);
        t.setMessageConverter(converter());
        return t;
    }
}