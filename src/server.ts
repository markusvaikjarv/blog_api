import { app }  from './app' 

const port: string | number = process.env.PORT || 9281;

app.listen(port, () => {
    console.log(`Waiting for requests at http://localhost/${port}`);
})

export default app