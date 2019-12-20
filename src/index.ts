import './styles.scss';
import 'zone.js';

console.log('Hello world!');

const main = () => {
  console.log('Starting setTimeout');
  setTimeout(() => {
    console.log('Finished something!');
  }, 2000);

  console.log('After setTimeout');
};

const zoneSpec: ZoneSpec = {
  name: 'mainZone',
  onScheduleTask: (parent, current, target, task) => {
    console.log('Scheduled ' + task.source + ' => ' + task.data.handleId);
    return parent.scheduleTask(target, task);
  },
  onInvokeTask: (parent, current, target, task) => {
    console.log('Invoking ' + task.source + ' => ' + task.data.handleId);
    parent.invokeTask(target, task);
  },
  onHasTask(parent, current, target, hasTask) {
    if (hasTask.macroTask) {
      console.log('There are outstanding MacroTasks.');
    } else {
      console.log('All MacroTasks have been completed.');
    }
  }
};

Zone.current.fork(zoneSpec).run(main);
