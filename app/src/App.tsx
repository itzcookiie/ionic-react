import {FormEvent, useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp, IonContent, IonHeader,
    IonIcon, IonItem,
    IonLabel, IonInput, IonRow,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs, IonTitle, IonToolbar,
    setupIonicReact, IonFab, IonFabButton, IonButton, IonGrid, IonCol, IonList
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {add, ellipse, square, triangle, checkmarkOutline, closeCircleOutline} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

interface Todo {
    id: string;
    todo: string;
    completed: boolean;
}

const App: React.FC = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<string>('');

    useEffect(() => console.log(todos), [todos]);

    const handleInput = (e: FormEvent) => {
        const element = e.target as HTMLInputElement;
        if(element) setTodo(element.value);
    }

    const addTodo = () => {
        setTodos((state: Todo[]): Todo[] => {
            return [
                ...state,
                {id: crypto.randomUUID(), todo, completed: false}
            ];
        });
    };

    const completeTodo = (currentTodoId: string) => {
        setTodos((state: Todo[]): Todo[] => {
            return state.map(oldTodo => {
                if(oldTodo.id === currentTodoId) oldTodo.completed = true;
                return oldTodo;
            });
        });
    };

    const deleteTodo = (currentTodoId: string) => {
        setTodos(todos.filter(oldTodo => oldTodo.id !== currentTodoId));
    };

    return (
    <IonApp>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Todo app</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem>
                <IonGrid fixed={true}>
                    <IonRow class="ion-align-items-center">
                        <IonCol>
                            <IonLabel position='floating'>Task</IonLabel>
                            <IonInput onInput={handleInput}></IonInput>
                        </IonCol>
                        <IonCol size="auto">
                            <IonButton disabled={!todo} onClick={addTodo}>+</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItem>
            <IonList>
                {todos.map(singleTodo => (
                    <IonItem key={singleTodo.id}>
                        <IonLabel style={{'textDecoration': singleTodo.completed ? 'line-through' : 'none'}} key={singleTodo.id}>{singleTodo.todo}</IonLabel>
                        <IonIcon onClick={() => completeTodo(singleTodo.id)} icon={checkmarkOutline} color="success" />
                        <IonIcon onClick={() => deleteTodo(singleTodo.id)} icon={closeCircleOutline} color="danger" />
                    </IonItem>
                ))}
            </IonList>
        </IonContent>
    </IonApp>)
};

export default App;
