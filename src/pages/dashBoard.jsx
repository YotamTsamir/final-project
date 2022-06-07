import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

export const DashBoard = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [boardData, setData] = useState({})
    const params = useParams();
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );
    ChartJS.defaults.color = "#fff";
    useEffect(() => {
        getData()
    }, [board])
    // useEffect(() => {
    //     getData()
    // }, [board])


    const getData = () => {
        console.log('board is', board)
        if (!board?._id) return
        const members = board?.members?.length
        let labels = {}
        let membersDet = {}
        let taskNumbers = 0
        let completedTasks = 0
        let unCompletedTasks = 0
        let checkLists = 0
        let doneTodos = 0
        let totalTodos = 0
        board.labels.map(label => {
            labels[label.id] = label
            labels[label.id]['count'] = 0

        })

        board.members.forEach(member => {
            membersDet[member._id] = member
            membersDet[member._id].count = 0
        })
        board.boxes.forEach(box => {
            box.tasks.forEach(task => {
                if (task.members) {
                    task.members.forEach(member => {
                        membersDet[member._id].count += 1
                    })
                }
                task.labelIds.forEach(labelId => {
                    if (labelId) labels[labelId].count += 1
                })
                taskNumbers += 1
                if (task.checkLists.length > 0) {
                    task.checkLists.forEach(checklist => {
                        checkLists += 1
                        checklist.todos.forEach(todo => {
                            if (todo.isDone) doneTodos += 1
                            totalTodos += 1
                        })
                    })
                }
                if (task.date) {
                    if (task.date.isComplete === 'complete') completedTasks += 1
                    else unCompletedTasks += 1
                }
            })
        })
        console.log('each account has this and this tasks', membersDet)
        const labelNames = Object.keys(labels).map(labelId => { return labels[labelId].title })
        const labelCounts = Object.keys(labels).map(labelId => { return labels[labelId].count })
        const labelColors = Object.keys(labels).map(labelId => { return labels[labelId].color })
        const userNames = Object.keys(membersDet).map(memberId => { return membersDet[memberId].fullname })
        const userCount = Object.keys(membersDet).map(memberId => { return membersDet[memberId].count })
        const data = { labelColors, labelNames, userNames, userCount, labelCounts, members, taskNumbers, checkLists, doneTodos, totalTodos, completedTasks, unCompletedTasks }
        setData(data)
    }

    const dataBig = {
        labels: boardData.userNames,
        datasets: [
            {
                label: 'Tasks per member',
                data: boardData.userCount,
                backgroundColor: ['rgba(255, 99, 132, 0.8)','#006b00d8','#1512cfd8','#ebff11d8'],
                color:'white',
            },
        ],
    };

     const optionsBar = {
        responsive: true,
        plugins: {
          legend: {
            display:false,
            color:'white'
          },
          title: {
            display: false,
            text: 'Tasks per member',
            color:'white'
          },
        },
      };
     const optionsPie = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display:false,
            font:{color:'white'},
            color:'white'
          }
          },
          title: {
            display: true,
            text: 'Tasks per label',
            color:'white'
          },
        }
      
     const optionsDou = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            
          },
          title: {
            display: true,
            text: '',
            color:'white'
          },
        },
      };

    const doughnutData = {
        labels: [
            'Todos completed',
            'Todos incomplete',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [boardData.doneTodos, boardData.totalTodos - boardData.doneTodos],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',

            ],
            color:'white',
            hoverOffset: 4
        }]
    };
    const pieData = {
        labels:
            boardData.labelNames
        ,
        datasets: [{
            label: 'My First Dataset',
            data: boardData.labelCounts,
            backgroundColor: boardData.labelColors,
            hoverOffset: 4
        }]
    };

    if (!board) return <h1>Loading...</h1>
    return <div className="dash-board-container">
        <NavLink style={{position:'absolute'}} to={`/b/${board._id}`}>X</NavLink>
        <div className="top-info">

        <div className="members" style={{ color: 'white' }}>Members:{boardData.members}</div>
        <div className="total-tasks">
            <div className="total-tasks-in" style={{ color: 'white' }}>Tasks:{boardData.taskNumbers}</div>
            <div className="completed-tasks" style={{ color: 'white' }}>Completed tasks:{boardData.completedTasks}</div>
            <div className="uncompleted-tasks" style={{ color: 'white' }}>Uncompleted tasks:{boardData.unCompletedTasks}</div>
        </div>
        <div className="checklists">
            <div className="total-checklists" style={{ color: 'white' }}>Total checklists:{boardData.checkLists}</div>
            <div className="done-todos" style={{ color: 'white' }}>Done todos:{boardData.doneTodos}</div>
            <div className="total-todos" style={{ color: 'white' }}>Total todos:{boardData.totalTodos}</div>
        </div>
        </div>

        <div className="left-graph-big"><span className="task-per-sp">Tasks per member:</span><Bar className="bar" options={optionsBar} data={dataBig} /></div>
        <div className="right-graph-top"><span className="checklist-sp">Checklist information:</span><Doughnut className="doughnut" options={optionsDou} data={doughnutData} /></div>
        <div className="right-graph-bottom"> <span className="checklist-info">Tasks per label:</span><Pie className="pie" options={optionsPie} data={pieData} /></div>
    </div>
}