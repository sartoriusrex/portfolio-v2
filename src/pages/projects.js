import '../styles/projects.scss';
import '../scripts/burger-menu';
import { appearingProjects } from '../scripts/animations';
import { toggleVisible, clickLeft, clickRight } from '../scripts/skill-carousel';

appearingProjects();

// show first element
toggleVisible();

//click listeners for buttons
clickLeft();
clickRight();