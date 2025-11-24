import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mongodb API',
      version: '1.0.0',
      description: 'A robust API for managing tasks, complete with JWT authentication, user-specific authorization, and advanced filtering capabilities (including due date and recurrence).',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the JWT token obtained after successful login.',
        },
      },
      schemas: {
        Task: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            completed: { type: 'boolean' },
            dueDate: { type: 'string', format: 'date-time' },
            recurrence: { type: 'string', enum: ['daily', 'weekly', 'monthly', 'yearly'] },
          },
          required: ['title'],
        },
        Login: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
          required: ['email', 'password'],
        },
      },
    },
    security: [{ BearerAuth: [] }], // Apply BearerAuth globally unless overridden
  },
  // Paths to files containing OpenAPI comments (JSDoc-style)
  apis: ['./src/api/v1/routes/*.ts'], 
};

export const specs = swaggerJsdoc(options);