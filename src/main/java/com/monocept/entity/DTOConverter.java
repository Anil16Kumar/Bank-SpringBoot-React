package com.monocept.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageImpl;

public class DTOConverter {
	
	public static List<BankDTO> bankDtoConverter(List<Bank> banks) {
		
		List<BankDTO> dto = new ArrayList<BankDTO>();
		
		for(int i=0;i<banks.size();i++) {
			BankDTO curr = new BankDTO();
			curr.setAbbrevation(banks.get(i).getAbbrevation());
			curr.setBankid(banks.get(i).getBankid());
			curr.setBankname(banks.get(i).getBankname());
			curr.setAccounts(banks.get(i).getAccounts());
			dto.add(curr);
		}
		
		return dto;
	}
	
	
	public static Page<BankDTO> convertToBankDtoPage(Page<Bank> bankPage) {
	    List<BankDTO> bankDTOs = DTOConverter.bankDtoConverter(bankPage.getContent());
	    return new PageImpl<>(bankDTOs, bankPage.getPageable(), bankPage.getTotalElements());
	}
	
	//----------------------ACCOUNTS_______________________________________________
	
	public static List<AccountDTO> accountDtoConverter(List<Account> accounts){
		
		List<AccountDTO> dto = new ArrayList<AccountDTO>();
		
		for(int i=0;i<accounts.size();i++) {
			AccountDTO curr = new AccountDTO();
		
			curr.setAccountno(accounts.get(i).getAccountno());
			curr.setBalance(accounts.get(i).getBalance());
			curr.setCustomerID(accounts.get(i).getCustomer().getCustomerid());
			curr.setBankAbbriviation(accounts.get(i).getBank().getAbbrevation());
			dto.add(curr);
		}
		return dto;
	}
	
	public static Page<AccountDTO> convertToAccountDtoPage(Page<Account> accountPage){
		List<AccountDTO> accountDtos = DTOConverter.accountDtoConverter(accountPage.getContent());
		return new PageImpl<>(accountDtos,accountPage.getPageable(),accountPage.getTotalElements());
	}

}
