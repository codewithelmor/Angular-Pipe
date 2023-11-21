# Pipe

In Angular, a **`pipe`** is a way to transform data in a template. Pipes are used to format data before displaying it in the view. Angular provides a set of built-in pipes for common tasks, and you can also create custom pipes.

Here's a brief overview of how to use pipes in Angular:

## Built-in Pipes:

1. **`UpperCasePipe/LowerCasePipe`**:
```js
{{ value | uppercase }}
{{ value | lowercase }}
```

2. **`CurrencyPipe`**:
```js
{{ price | currency:'USD':'symbol':'1.2-2' }}
```

3. **`DatePipe`**:
```js
{{ date | date:'short' }}
```

4. **`DecimalPipe/PercentPipe`**:
```js
{{ number | number:'1.2-2' }}
{{ percentage | percent:'1.2-2' }}
```

## Custom Pipes:

You can also create your own custom pipes for more specific transformations.

1. **`Generate a new pipe`**:
```bash
ng generate pipe my-custom-pipe
```

2. **`Implement the transformation logic`**:

In the generated **`my-custom-pipe.pipe.ts`** file, you'll see a class with a **`transform`** method. Implement the logic for your transformation here.

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

3. **`Use the custom pipe in your template`**:

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

# Observable

In Angular, an **`Observable`** is a powerful and widely used tool for handling asynchronous operations and events. Observables are part of the RxJS (Reactive Extensions for JavaScript) library, which provides a set of powerful tools for reactive programming.

Here's a brief overview of key concepts related to Angular Observables:

1. **`Observable`**: An Observable represents a stream of data or events that can be observed over time. It can emit multiple values asynchronously.

2. **`Observer`**: An Observer is an object that listens to the Observable and reacts to the data or events it emits. It consists of three methods: next(), error(), and complete().

3. **`Subscription`**: A Subscription is an object that represents the execution of an Observable. It is used to unsubscribe from the Observable when it's no longer needed, preventing memory leaks.

4. **`Operators`**: Operators are functions provided by RxJS that allow you to manipulate the data emitted by Observables. They are used to transform, filter, or combine Observables.

Here's a simple example of using an Observable in an Angular component:

```typescript
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-component',
  template: `
    <h1>{{ data$ | async }}</h1>
  `,
})
export class MyComponent implements OnInit {
  data$: Observable<string>;

  ngOnInit() {
    // Creating an Observable
    this.data$ = new Observable((observer) => {
      // Emitting data
      observer.next('Hello, World!');

      // Completing the Observable
      observer.complete();
    });
  }
}
```

In this example, the **`async`** pipe in the template subscribes to the **`data$`** Observable, automatically handling the subscription and unsubscription.

You can also use operators to transform or manipulate data. For example:

```typescript
import { map } from 'rxjs/operators';

// ...

ngOnInit() {
  this.data$ = new Observable((observer) => {
    observer.next('Hello, World!');
    observer.complete();
  }).pipe(
    // Using the map operator to transform the data
    map((data: string) => data.toUpperCase())
  );
}
```

This is a basic introduction to Angular Observables. There's much more you can do with them, such as handling HTTP requests, dealing with multiple Observables, error handling, and more. The RxJS library provides a wide range of operators to help you compose complex asynchronous operations.

## Create New Observable

To create a new Observable in Angular, you typically use the Observable class from RxJS. Here's an example of how you can create a simple Observable that emits values over time:

```typescript
import { Observable } from 'rxjs';

const myObservable = new Observable<number>((observer) => {
  // Emit values asynchronously
  observer.next(1);

  setTimeout(() => {
    observer.next(2);
  }, 1000);

  setTimeout(() => {
    observer.next(3);
    // Complete the observable
    observer.complete();
  }, 2000);

  // This won't be emitted after complete
  setTimeout(() => {
    observer.next(4);
  }, 3000);
});

// Subscribe to the Observable
const subscription = myObservable.subscribe({
  next: (value) => {
    console.log('Received value:', value);
  },
  error: (error) => {
    console.error('Error:', error);
  },
  complete: () => {
    console.log('Observable complete');
  },
});

// Unsubscribe after a certain time (for example, 2500 milliseconds)
setTimeout(() => {
  subscription.unsubscribe();
}, 2500);

```

In this example, we create an Observable **`myObservable`** that emits values 1, 2, and 3 over a period of time. The **`subscribe`** method is used to listen to the Observable. The **`next`** callback is called when a new value is emitted, the error callback is called if there's an error, and the **`complete`** callback is called when the Observable completes.

Note that once the Observable completes, any subsequent values won't be emitted. In this example, the value 4 is not emitted because the Observable completes after emitting 3.

This is a basic example, and in a real Angular application, you might use Observables for various tasks, such as handling HTTP requests, event handling, or managing state in your application.

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
