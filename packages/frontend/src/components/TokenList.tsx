import { Token } from "@/types";
import { Table } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function TokenList(props: { tokens: Token[] }) {
  const router = useRouter();

  const rows = props.tokens.map((token) => (
    <Table.Tr key={token.id} onClick={() => router.push(`/tokens/${token.id}`)}>
      <Table.Td>{token.id}</Table.Td>
      <Table.Td>{token.owner}</Table.Td>
      <Table.Td>{token.slot}</Table.Td>
      <Table.Td>{token.value}</Table.Td>
      <Table.Td>{token.tokenUri}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>所有者</Table.Th>
          <Table.Th>Slot</Table.Th>
          <Table.Th>Value</Table.Th>
          <Table.Th>TokenURI</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
