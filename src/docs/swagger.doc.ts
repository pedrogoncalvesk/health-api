import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
/**
 * Swagger doc builder
 */
export class SwaggerDoc {
  setupDocs = (app: INestApplication) => {
    const title = 'API NestJS with Oracle Database';
    const description = `This application presents several programming concepts and best practices such as: 
    code organization and structure, design patterns, solid concepts and clean architecture.`;
    const version = '1.0.0';
    //tags must be order manually
    //order by A-Z
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .setExternalDoc('Organization Website', 'https://example.com')

      //use api key
      .addSecurity('ApiKeyAuth', {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: 'Security Token',
      })

      .build();
    //customize swagger
    // const favicon =
    //   'https://icon-library.com/images/rest-api-icon/rest-api-icon-26.jpg';

    // const cssFile = path.join(
    //   __dirname,
    //   '../../../assets/swagger/theme-flattop.css',
    // );
    // const options = {
    //   explorer: true, //explorer disable manually,
    //   customSiteTitle: 'API NestJS',
    //   customCss: fs.readFileSync(cssFile, { encoding: 'utf-8' }),
    //   customfavIcon: favicon,
    // };
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
    // generate swagger json
    writeFileSync('./swagger-docs.json', JSON.stringify(document));
  };
}
