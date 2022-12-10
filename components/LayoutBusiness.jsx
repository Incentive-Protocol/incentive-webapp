export default function LayoutBusiness({ children }) {
  return (
    <>
      <div className="Full Flex Column" style={{ gap: '1.5rem', paddingBottom: '10rem' }}>
        {children}
      </div>
    </>
  );
}
