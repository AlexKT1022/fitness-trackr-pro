import { useNavigate, useParams } from 'react-router';
import useQuery from '../api/useQuery';
import { useAuth } from '../auth/AuthContext';
import useMutation from '../api/useMutation';

export default function ActivityPage() {
  const { id } = useParams();
  const navigate = useNavigate('/activities');
  const { data: activity } = useQuery(`/activities/${id}`, 'activities');
  const { token } = useAuth();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation('DELETE', '/activities/' + id, ['activities']);

  const handleDelete = () => {
    try {
      deleteActivity();
      navigate('/activities');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{activity?.name}</h1>
      <p>by {activity?.creatorName}</p>
      <p>{activity?.description}</p>
      {token && (
        <button onClick={() => handleDelete()}>
          {loading ? 'Deleting' : error ? error : 'Delete'}
        </button>
      )}
    </div>
  );
}
