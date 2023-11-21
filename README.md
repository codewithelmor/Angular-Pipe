# Pipe

In Angular, a pipe is a way to transform data in a template. Pipes are used to format data before displaying it in the view. Angular provides a set of built-in pipes for common tasks, and you can also create custom pipes.

Here's a brief overview of how to use pipes in Angular:

## Built-in Pipes:

1. **UpperCasePipe/LowerCasePipe**:
```js
{{ value | uppercase }}
{{ value | lowercase }}
```

2. **CurrencyPipe**:
```js
{{ price | currency:'USD':'symbol':'1.2-2' }}
```

3. **DatePipe**:
```js
{{ date | date:'short' }}
```

4. **DecimalPipe/PercentPipe**:
```js
{{ number | number:'1.2-2' }}
{{ percentage | percent:'1.2-2' }}
```

## Custom Pipes:

You can also create your own custom pipes for more specific transformations.

1. **Generate a new pipe**:
```bash
ng generate pipe my-custom-pipe
```

2. **Implement the transformation logic**:

In the generated **my-custom-pipe.pipe.ts** file, you'll see a class with a **transform** method. Implement the logic for your transformation here.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomPipe'
})
export class MyCustomPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // Your transformation logic here
    return transformedValue;
  }
}
```

3. **Use the custom pipe in your template**:

```typescript
{{ data | myCustomPipe }}
```

Remember to add your custom pipes to the declarations array in the module where you want to use them.

## Chaining Pipes:

You can also chain multiple pipes together for more complex transformations.

```typescript
{{ value | uppercase | myCustomPipe | currency:'USD':'symbol':'1.2-2' }}
```

This will apply each transformation in sequence.

These are just basic examples, and there are many more built-in pipes and possibilities for creating custom pipes in Angular. Pipes provide a convenient way to format and manipulate data in your application's templates.

# Screnshot

<a href="https://ibb.co/xSnqmYv"><img src="https://i.ibb.co/FbQ4sXv/2023-11-20-08-24-24.gif" alt="2023-11-20-08-24-24" border="0"></a>

# Commands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
