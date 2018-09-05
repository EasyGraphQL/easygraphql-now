<h1 align="center">
  <img src="https://cdn.rawgit.com/EasyGraphQL/easygraphql-mock/baab331c/EasyGraphQL.png" alt="EasyGraphQL now " width="350">
  <br>
  EasyGraphQL Now 
  <br>
  <br>
</h1>

`easygraphql-now` is a node library used to create servers with mocks of the schema you pass. 

## Installation
```bash
$ npm install -g easygraphql-now
```

## Usage
To get started with the tester, you might need to follow the next steps:

### Deploy with Now ▲
+ Visit the directory with the schema to deploy or pass the schema route.
+ Be sure you have already setup [`now`](https://zeit.co/now).
+ Run `easygraphql-now`.
+ Select the file.
+ It will create the server and deploy with [`now`](https://zeit.co/now), after that you will get a url with your GraphQL server.

<img src="gif/1.gif" width="400px">
<img src="gif/3.gif" width="400px">


### Try it locally
+ Visit the directory with the schema to deploy or pass the schema route.
+ Run `easygraphql-now --local -p=8000`.
  + Add `-p=8000` with your favorite port, by default is 8000.
+ Select the file.
+ After that you will get a url with your local GraphQL server.

<img src="gif/2.gif" width="400px">



# License
### The MIT License

Copyright (c) 2018 EasyGraphQL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.