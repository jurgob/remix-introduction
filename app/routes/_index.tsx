import { MetaFunction ,json} from "@remix-run/node";
import { useLoaderData , Form, useRouteError } from "@remix-run/react";
import {useState, useEffect} from "react"

export const meta: MetaFunction = () => {
  return [
    { title: "My app" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  throw json({ ok: false }, { status: 500 });
  return json({ ok: true });
};

export  const action = async() => {
  return json({ inderted: true })
}


export function ErrorBoundary() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  
  return <div>INDEX PAGE ERROR PAGE: {error.status }</div>
  
} 

function MyComponent(props: {test: string}){
  console.log("YOLLOOOOOOO")
  const [count, setCount] = useState(0)
  const [curDate, setCurDate] = useState(0)
  useEffect(() => {
    console.log("YOLLOOOOOOO ONLY BROWSER")

    setCurDate(Date.now())
  }, [])
  return <button onClick={() => {
    setCount(count + 1)
  }} >My Component {props.test} {count}  -- cur date: {curDate || "no date"}</button>
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex h-screen items-center justify-center">
      {data.ok ? "ok": "not ok"}
      <MyComponent test="hello" />
      <Form method="post" > 
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
      
    </div>
  );
}