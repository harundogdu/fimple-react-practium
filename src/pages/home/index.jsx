import { LoanCalculator, Navbar } from 'containers';

export default function Home() {
  return (
    <section className='home'>
      <Navbar />
      <div className='home__container'>
        <LoanCalculator />
      </div>
    </section>
  );
}
