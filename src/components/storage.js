const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const update = (key, value) => {
  try {
    const serializedState = localStorage.getItem(key);
    localStorage.removeItem(serializedState);
    save(key, value);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const deleteLocal = key => {
  try {
    // const serializedState = localStorage.getItem(key);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? null : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export { save, load, update, deleteLocal };
