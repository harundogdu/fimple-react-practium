import { LoanCalculator, Navbar } from 'containers';

export default function Home() {
  return (
    <section className='home'>
      <Navbar />
      <LoanCalculator />
    </section>
  );
}
