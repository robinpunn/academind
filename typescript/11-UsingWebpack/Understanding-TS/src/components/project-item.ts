import { Draggable } from '../models/drag-drop'
import { Project } from '../models/project';
import Component from './base-component'
import { autobind } from '../decorators/autobind';


// rendering project items with a class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get people() {
        if (this.project.people === 1) {
            return '1 person assigned'
        } else {
            return `${this.project.people} people assigned`
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {
        console.log('Drag End')
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.people;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
