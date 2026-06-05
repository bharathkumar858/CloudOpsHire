package com.cloudopshire.api;

import com.cloudopshire.gateway.ApiGatewayApplication;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(
		classes = ApiGatewayApplication.class,
		properties = {
				"jwt.secret=test-secret-key-for-api-gateway-tests-123456",
				"eureka.client.enabled=false"
		}
)
class ApiGatewayApplicationTests {

	@Test
	void contextLoads() {
	}

}
