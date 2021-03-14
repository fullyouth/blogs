class Component {
  constructor(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
}
Component.prototype.isReactComponent = {};

Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

interface classComponentUpdater {
  isMounted,
  enqueueForceUpdate,
  enqueueSetState,
  enqueueReplaceState
}

const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const update = createUpdate(eventTime, lane);

    enqueueUpdate(fiber, update, lane);
    const root = scheduleUpdateOnFiber(fiber, lane, eventTime);
    if (root !== null) {
      entangleTransitions(root, fiber, lane);
    }

    if (enableSchedulingProfiler) {
      markStateUpdateScheduled(fiber, lane);
    }
  },
  enqueueReplaceState,
  enqueueForceUpdate
}
