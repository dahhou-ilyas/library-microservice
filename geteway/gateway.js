const express=require("express");
const {createProxyMiddleware}=require('http-proxy-middleware');

const app=express();
const port=4000;

// Configuration du proxy pour les microservices
const bookServiceProxy = createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true});
const customerServiceProxy = createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true });
const orderServiceProxy = createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true });

// Routage des requêtes vers les microservices appropriés
app.use('/books/*', bookServiceProxy);
app.use('/customers/*', customerServiceProxy);
app.use('/orders/*', orderServiceProxy);

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});