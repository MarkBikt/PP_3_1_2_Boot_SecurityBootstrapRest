package ru.kata.spring.boot_security.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
	}

}
//<select th:field="*{roles}" id="roles"> убрать хардкод ролей , рооли загружать с бекенда
//
//todo loadUserByUsername(
// public List<User> index()
// public User show(Long id)
// public User showInfoUser(Long id)  - зачем тут транзакция?





//@PreAuthorize("hasRole('ROLE_ADMIN')") вот это вот должно быть либо в конфигах ,
// либо на входе в приложении . Но явно не в сервисе
//
//замени дао на спринг дата жпа
//
//@ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL}) заменить на LAZY ,
// знать все про проблему н+1
//
//@ManyToMany(mappedBy = "roles", cascade = {CascadeType.ALL})
// а ты прям уверен что при удалении роли пользователя тоже нужно удалить к примеру?
//
//@Transactional(readOnly = true) - вообще это лишнее ,
// ты и так вычитываешь из бд в неявной транзакции , а тут ты лишние ресурсы задействуешь
//
//public User getUserByUsername(String username) { - этот метод какое логическое значение в себе несет?
//
//как добавлять пользователям роли? Сделай так что б можно было давать 2 роли одновременно
// при создании пользователей



//1. Перенесите классы и зависимости из предыдущей задачи.
//2. Создайте класс Role и свяжите User с ролями так, чтобы юзер мог иметь несколько ролей.
//3. Имплементируйте модели Role и User интерфейсами GrantedAuthority и UserDetails соответственно.
// Измените настройку секьюрности с inMemory на userDetailService.
//4. Все CRUD-операции и страницы для них должны быть доступны только пользователю с ролью admin по url: /admin/.
//5. Пользователь с ролью user должен иметь доступ только к своей домашней странице /user, где выводятся его данные.
// Доступ к этой странице должен быть только у пользователей с ролью user и admin.
// Не забывайте про несколько ролей у пользователя!
//6. Настройте logout с любой страницы с использованием возможностей thymeleaf.
//7. Настройте LoginSuccessHandler так, чтобы админа после аутентификации направляло на страницу /admin,
// а юзера на его страницу /user.