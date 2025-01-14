/* eslint-disable react/prop-types */
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import Task from '../Task/Task';
import TaskInput from '../TaskInput/TaskInput';
import './TaskList.css';

const TaskList = (props) => {
    const [task, setTask] = useState([]);
    const [isTask, setIsTask] = useState(false);

    const GetAllTask = async () => {
        const q = query(collection(db, 'Task'), where('tasklist_id', '==', props.taskList.id));
        onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.docs.map((doc) => (
                list.push({ id: doc.id, ...doc.data()})
            ));
            list.sort((a, b) => a.createdOn > b.createdOn ? -1 : 1);
            setTask(list);
        });
        setIsTask(true);
    };

    useEffect(() => {
        if (!isTask) GetAllTask();
    }, []);

    return (
        <div className='tasklist__container'>
            {/* TODO: tasklist header */}
            <div className="tasklist__header">
                <div className='tasklist__header__name'>{ props.taskList.tasklist_name }</div>
            </div>

            {/* add task here */}
            <div className="tasklist__tasks">
                <TaskInput tasklist_id={props.taskList.id} />
                {
                    task?.map((item, index) => {
                        return <div key={index}>
                            <Task task={item} />
                        </div>;
                    })
                }
            </div>
        </div>
    );
};

export default TaskList;
