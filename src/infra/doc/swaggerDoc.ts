import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';

export class SwaggerDoc {
	static serve() {
		return swaggerUi.serve;
	}

	static setup() {
		return swaggerUi.setup(swaggerDocument);
	}
}
