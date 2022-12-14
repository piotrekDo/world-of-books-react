import classes from '../style/HomePageWelcomeSection.module.css'

const HomePageWelcomeSection = () => {
    return(
        <div className={classes.main}>
            <h1 data-aos="fade-in" data-aos-duration="3000" data-aos-delay="400">Welcome to World of books</h1>
            <p data-aos="fade-left" data-aos-duration="2500" data-aos-delay="900">a place to discover yourself</p>
        </div>
    );
};

export default HomePageWelcomeSection;
