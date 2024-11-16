function CapsLock(props) {
  const textInCapsLock = props.text.toUpperCase();

  return <p>{textInCapsLock}</p>;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <CapsLock text="test" />
    </>
  );
}
