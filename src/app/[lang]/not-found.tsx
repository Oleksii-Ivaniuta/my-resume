import Link from "next/link";

export default function NotFound() {




  return (
    <section style={{textAlign:'center', padding:'2rem 0'}}>
      <h2 style={{marginBottom: '2rem'}}>This page is not found</h2>
      <p>
        <Link href={`/`}>Go back home</Link>
      </p>
    </section>
  );
}