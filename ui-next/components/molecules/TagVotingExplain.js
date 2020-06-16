import { TagVotingStyles } from './TagStyles';

export default function TagVotingExplain(props) {
  return (
    <TagVotingStyles>
      <p>Explain</p>

      <table>
        <caption>Vote pricing</caption>
        <tbody>
          <tr>
            <th>Number of votes</th>
            <th>"Vote credit" cost</th>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>4</td>
          </tr>
          <tr>
            <td>3</td>
            <td>9</td>
          </tr>
          <tr>
            <td>4</td>
            <td>16</td>
          </tr>
          <tr>
            <td>5</td>
            <td>25</td>
          </tr>
          <tr>
            <td>6</td>
            <td>36</td>
          </tr>
          <tr>
            <td>7</td>
            <td>49</td>
          </tr>
          <tr>
            <td>8</td>
            <td>64</td>
          </tr>
          <tr>
            <td>9</td>
            <td>81</td>
          </tr>
          <tr>
            <td>10</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
    </TagVotingStyles>
  );
}
