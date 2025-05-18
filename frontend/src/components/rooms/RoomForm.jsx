import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function RoomForm({ defaultValues, onSubmit }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Room Name</label>
        <input className="form-control" {...register('name')} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Type</label>
        <input className="form-control" {...register('type')} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Capacity</label>
        <input className="form-control" type="number" {...register('capacity')} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input className="form-control" type="number" {...register('price')} required />
      </div>

      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default RoomForm;
