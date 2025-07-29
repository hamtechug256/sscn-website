import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Admissions from './pages/Admissions';
import CampusLife from './pages/CampusLife';
import News from './pages/News';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/main.css';
import './styles/variables.css';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/programs" component={Programs} />
                <Route path="/admissions" component={Admissions} />
                <Route path="/campus-life" component={CampusLife} />
                <Route path="/news" component={News} />
            </Switch>
            <Footer />
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));